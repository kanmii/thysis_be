import * as React from "react";
import jss from "jss";
import preset from "jss-preset-default";
import { Input } from "semantic-ui-react";
import { List } from "semantic-ui-react";
import { Message } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { InputOnChangeData } from "semantic-ui-react/dist/commonjs/elements/Input/Input";
import debounce from "lodash-es/debounce";
import { Cancelable } from "lodash";
import update from "immutability-helper";
import {
  GraphqlQueryControls,
  withApollo,
  WithApolloClient
} from "react-apollo";
import { ApolloQueryResult } from "apollo-client";
import { GraphQLError } from "graphql/error/GraphQLError";

import { ROOT_CONTAINER_STYLE, SimpleCss } from "../constants";
import RootHeader from "../components/header.component";
import SearchQuotesMenuState from "../components/search-quotes-route-bottom-menu.component";
import mainContentStyle from "../utils/main-content-centered-style.util";
import {
  AllMatchingTextsQuery,
  AllMatchingTextsQueryVariables,
  TextSearchResultFragFragment
} from "../graphql/gen.types";
import { TextSearchRowFragFragment } from "../graphql/gen.types";
import ALL_MATCHING_TEXT_QUERY from "../graphql/text-search.query";

jss.setup(preset());

const resultRowItemStyle = {
  borderTop: ["none", "!important;"]
  // tslint:disable-next-line:no-any
} as any;

const styles = {
  root: ROOT_CONTAINER_STYLE,

  input: {
    margin: "0 5px"
  },

  mainContent: {
    ...mainContentStyle,
    margin: "5px 3px 0 0"
  },

  resultContainer: {
    margin: "0",
    overflowY: "auto",
    wordBreak: "break-all"
  },

  result: {
    marginTop: "15px;",
    "&.first-of-type": {
      marginTop: "0;"
    }
  },

  resultRowHeaderContainer: {
    textAlign: "center"
  },

  resultRowHeader: {
    display: "inline-block",
    minWidth: "40%",
    boxShadow: "0 1px 1px -1px black;"
  },

  resultRowItem: {
    ...resultRowItemStyle,
    borderBottom: "1px solid #22242626",
    marginTop: "8px"
  }
} as SimpleCss;

const { classes } = jss.createStyleSheet(styles).attach();

type SemanticOnInputChangeFunc = (
  e: React.ChangeEvent<HTMLInputElement>,
  data: InputOnChangeData
) => void;

interface SearchQuotesState {
  searchText: "";
  searchLoading: boolean;
  result?: TextSearchResultFragFragment;
  searchError?: GraphQLError[];
  hasResult?: boolean;
}

interface OwnProps {
  ignore?: boolean;
}

type SearchQuotesProps = OwnProps &
  GraphqlQueryControls<AllMatchingTextsQueryVariables> &
  WithApolloClient<OwnProps>;

class SearchQuotes extends React.Component<
  SearchQuotesProps,
  SearchQuotesState
> {
  state: SearchQuotesState = {
    searchText: "",
    searchLoading: false
  };

  doSearchDebounced: (() => void) & Cancelable;

  constructor(props: SearchQuotesProps) {
    super(props);

    this.doSearchDebounced = debounce(this.doSearch, 500);
  }

  componentWillUnmount() {
    this.doSearchDebounced.cancel();
  }

  render() {
    return (
      <div className={classes.root}>
        <RootHeader title="Search Quotes" />

        <form>
          <Input
            className={classes.input}
            icon="search"
            placeholder="Search..."
            fluid={true}
            autoFocus={true}
            onChange={this.onSearchInputChange}
            value={this.state.searchText}
            loading={this.state.searchLoading}
          />
        </form>

        <div className={classes.mainContent}>
          {this.state.result && this.renderResult(this.state.result)}
        </div>

        <SearchQuotesMenuState />
      </div>
    );
  }

  onSearchInputChange: SemanticOnInputChangeFunc = (e, { value }) => {
    this.setState(s =>
      update(s, {
        searchText: {
          $set: value
        }
      })
    );

    if (value.length > 1) {
      this.doSearchDebounced();
    }
  };

  doSearch = async () => {
    this.setState(s =>
      update(s, {
        searchLoading: {
          $set: true
        }
      })
    );

    try {
      const result = (await this.props.client.query({
        query: ALL_MATCHING_TEXT_QUERY,
        variables: {
          text: {
            text: this.state.searchText
          }
        }
      })) as ApolloQueryResult<AllMatchingTextsQuery>;

      this.setState(s =>
        update(s, {
          searchLoading: {
            $set: false
          },

          result: {
            $set: result.data.quoteFullSearch
          }
        })
      );
    } catch (error) {
      this.setState(s =>
        update(s, {
          searchLoading: {
            $set: false
          },

          searchError: {
            $set: error
          }
        })
      );
    }
  };

  renderResult = ({
    quotes,
    sources,
    sourceTypes,
    tags
  }: TextSearchResultFragFragment) => {
    return quotes || sources || sourceTypes || tags ? (
      <div className={classes.resultContainer}>
        {[quotes, sources, sourceTypes, tags].map(this.renderRow)}
      </div>
    ) : (
      <Message
        className={classes.resultContainer}
        style={{ textAlign: "center", padding: "10px" }}
        icon={true}
        warning={true}
        size="small"
      >
        <Icon
          name="warning"
          size="tiny"
          fitted={true}
          style={{ fontSize: "2em" }}
        />
        <Message.Content>No Result!</Message.Content>
      </Message>
    );
  };

  renderRow = (data: TextSearchRowFragFragment[], index: number) => {
    if (!data) {
      return;
    }

    const first = data[0];
    const header = first.source;

    return (
      <div className={classes.result} key={`${index + 1}-search-header`}>
        <div className={classes.resultRowHeaderContainer}>
          <span className={classes.resultRowHeader}>{header}</span>
        </div>

        <List divided={true}>{data.map(this.renderData)}</List>
      </div>
    );
  };

  renderData = ({ text, id }: TextSearchRowFragFragment) => {
    return (
      <List.Item key={id} className={classes.resultRowItem}>
        <List.Content>{text}</List.Content>
      </List.Item>
    );
  };
}

export default withApollo(SearchQuotes);
