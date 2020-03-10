import React from 'react'

export const Pagination = ({itemsPerPage, totalItems, paginate}) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <div id="pagination">
        {pageNumbers.map(num => (
          <p key={num}>
            <a onClick={() => paginate(num)} id="page-item">
              {num}
            </a>
          </p>
        ))}
      </div>
    </nav>
  )
}
