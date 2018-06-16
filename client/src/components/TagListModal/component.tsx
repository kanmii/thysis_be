import React from "react";
import { Modal, List } from "semantic-ui-react";
import { Loader } from "semantic-ui-react";

import { TagsMinimalRunQuery } from "../../graphql/ops.types";
import { TagsMinimalQueryResult } from "../../graphql/ops.types";
import { TagFragFragment } from "../../graphql/gen.types";
import TAGS_QUERY from "../../graphql/tags-mini.query";
import { makeTagURL } from "../../utils/route-urls.util";
import { styles } from "../SourceListModal/styles";
import { modalStyle } from "../SourceListModal/styles";
import { classes } from "../SourceListModal/styles";
import { TagListModalProps } from "./utils";

export class TagListModal extends React.PureComponent<TagListModalProps> {
  render() {
    const { open } = this.props;

    return (
      <TagsMinimalRunQuery query={TAGS_QUERY}>
        {dataProps => {
          return (
            <Modal
              style={modalStyle}
              basic={true}
              dimmer="inverted"
              open={open}
              onClose={this.resetModal}
            >
              <Modal.Content>
                <div className={classes.content}>
                  <div
                    className={classes.modalClose}
                    onClick={this.props.dismissModal}
                  >
                    &times;
                  </div>

                  {this.renderTags(dataProps)}
                </div>
              </Modal.Content>
            </Modal>
          );
        }}
      </TagsMinimalRunQuery>
    );
  }

  renderTags = ({ loading, data }: TagsMinimalQueryResult) => {
    if (loading) {
      return <Loader active={true} />;
    }

    const tags = data ? data.tags : null;

    if (tags) {
      return (
        <List style={styles.list} divided={true} relaxed={true}>
          {tags.map(this.renderTag)}
        </List>
      );
    }

    return undefined;
  };

  renderTag = ({ id, text }: TagFragFragment) => {
    return (
      <List.Item key={id} style={styles.listItem} onClick={this.navigateTo(id)}>
        <List.Content>{text}</List.Content>
      </List.Item>
    );
  };

  resetModal = () => {
    this.props.dismissModal();
  };

  private navigateTo = (id: string) => () => {
    this.resetModal();
    this.props.history.push(makeTagURL(id));
  };
}

export default TagListModal;