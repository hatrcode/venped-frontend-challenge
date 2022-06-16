const { test } = require("uvu");
const assert = require("uvu/assert");
const { request, gql } = require("graphql-request");

test("Test api", async () => {
  const query = gql`
    query FetchProducts(
      $tax_filter: [String!]
      $title_filter: String
      $order_by: String
      $order: String
      $page: Int!
      $per_page: Int!
    ) {
      fetchProducts {
        results(
          taxFilter: $tax_filter
          titleFilter: $title_filter
          orderBy: $order_by
          order: $order
          page: $page
          perPage: $per_page
        ) {
          id
          title
          price
          tax
          stock
        }
        pagination(
          taxFilter: $tax_filter
          titleFilter: $title_filter
          orderBy: $order_by
          order: $order
          page: $page
          perPage: $per_page
        ) {
          totalResults
          limitValue
          totalPages
          currentPage
          nextPage
          prevPage
          firstPage
          lastPage
          outOfRange
        }
      }
    }
  `;

  const variables = {
    tax_filter: ["es_general_21", "es_reduced_10"],
    title_filter: "coat",
    order_by: "price",
    order: "desc",
    page: 2,
    per_page: 1,
  };

  const { fetchProducts: data } = await request(
    "http://vps-123eb2fc.vps.ovh.net/graphql",
    query,
    variables
  );

  assert.instance(data, Object);
  assert.instance(data.results, Object);
  assert.is(data.results[0].title, "Small Plastic Coat");
});

test.run();
