import { Query, MutationFn } from "react-apollo";

import {
  TagsMinimalQuery,
  SourceMiniQuery,
  CreateQuoteMutation,
  CreateQuoteMutationVariables,
  CreateTagMutation,
  CreateTagMutationVariables,
  CreateSourceMutation,
  CreateSourceMutationVariables,
  SourceTypesQuery
} from "./gen.types";

export class TagsMinimalRunQuery extends Query<TagsMinimalQuery, {}> {}

// tslint:disable-next-line:max-classes-per-file
export class SourceMiniRunQuery extends Query<SourceMiniQuery, {}> {}

export type CreateQueryFn = MutationFn<
  CreateQuoteMutation,
  CreateQuoteMutationVariables
>;

export type CreateTagFn = MutationFn<
  CreateTagMutation,
  CreateTagMutationVariables
>;

export type CreateSourceFn = MutationFn<
  CreateSourceMutation,
  CreateSourceMutationVariables
>;

// tslint:disable-next-line:max-classes-per-file
export class SourceTypeRunQuery extends Query<SourceTypesQuery, {}> {}
