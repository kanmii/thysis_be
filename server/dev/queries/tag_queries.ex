defmodule GasWeb.TagQueries do
  def query(:tag) do
    """
    query Tag($tag: GetTagInput!) {
      tag(tag: $tag) {
        id
        text
        insertedAt
        updatedAt
      }
    }
    """
  end

  def query(:tags) do
    """
    query Tags {
      tags {
        id
        text
      }
    }
    """
  end
end