defmodule GasWeb.Query.Credential do
  def all_fields_fragment do
    name = "CredentialAllFieldsFragment"

    fragment = """
      fragment #{name} on Credential {
        credentialId
        _id
        schemaType
        source
        insertedAt
        updatedAt
      }
    """

    {name, fragment}
  end
end
