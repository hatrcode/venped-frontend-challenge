import { useState, useEffect, useCallback } from "react";

export const useFetch = (
  taxFilter,
  titleFilter,
  sortingOrder,
  sortingField,
  page
) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState();

  const endpoint = "http://vps-123eb2fc.vps.ovh.net/graphql";

  const FETCH_PRODUCTS = `
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

  let variables = {
    page,
    per_page: 10,
  };

  taxFilter.length > 0 ? (variables.tax_filter = taxFilter) : "";
  titleFilter.length > 0 ? (variables.title_filter = titleFilter) : "";
  sortingField.length > 0 ? (variables.order_by = sortingField) : "";
  sortingOrder.length > 0 ? (variables.order = sortingOrder) : "";

  const getItems = useCallback(async () => {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: FETCH_PRODUCTS,
        variables,
      }),
    });
    const data = await response.json();
    const content = data.data.fetchProducts;
    setProducts(content.results);
    setPagination(content.pagination);
    setLoading(false);
  }, [taxFilter, titleFilter, sortingField, sortingOrder, page]);

  useEffect(() => {
    getItems();
  }, [taxFilter, titleFilter, sortingField, sortingOrder, page, getItems]);
  return { loading, products, pagination };
};
