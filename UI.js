export const spinner = `
<div class="text-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden"></span>
  </div>
</div>
`;

export const globalSpinner = `
<div class="text-center" style="margin: 20%;">
  <div class="spinner-border" role="status" style="width: 7rem;height: 7rem;font-size: 50px;">
    <span class="visually-hidden"></span>
  </div>
</div>
`;

export const Tables = {
  usersTable: `
  <table class="table table-bordered table-striped table-hover">
  <div class="text-right">
  <input
    style="width: 30%;display: inline-block;"
    type="text"
    class="form-control"
    id="search"
    name="search"
    placeholder="Search"
    onkeyup="search()"
  />
  </div>
  <thead>
    <tr>
      <th onclick="sort('id')" style="cursor: pointer;"><i class="fa fa-sort"></i> ID</th>
      <th onclick="sort('name')" style='cursor: pointer;'><i class="fa fa-sort"></i> Name</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody id="usersTableRows">
  </tbody>
</table>`,
};

export const pagination = (page, totalPages) => `
<nav aria-label="...">
  <ul class="pagination">
    <li class="page-item ${page === 1 ? "disabled" : ""}">
      <button class="page-link" onclick="setPage(${1})"><<</button>
    </li>
    <li class="page-item ${page === 1 ? "disabled" : ""}">
      <button class="page-link" onclick="setPage(${page - 1})"><</button>
    </li>
    <li class="page-item ${page === 1 ? "active" : ""}">
      <button class="page-link" onclick="setPage(${
        page === 1
          ? 1
          : page === totalPages && totalPages !== 2
          ? page - 2
          : page - 1
      })">${
  page === 1
    ? page
    : page === totalPages && totalPages !== 2
    ? page - 2
    : page - 1
}</button>
    </li>
    ${
      totalPages > 1
        ? `
      <li class="page-item ${
        page === 1
          ? ""
          : totalPages === 2 && page === totalPages
          ? "active"
          : page === totalPages
          ? ""
          : "active"
      }">
        <button class="page-link" onclick="setPage(${
          page === 1
            ? 2
            : page === totalPages && totalPages !== 2
            ? page - 1
            : page
        })">${
            page === 1
              ? 2
              : page === totalPages && totalPages !== 2
              ? page - 1
              : page
          }</button>
      </li>
      `
        : ""
    }
    ${
      totalPages > 2
        ? `<li class="page-item ${
            page === totalPages ? "active" : ""
          }"><button class="page-link" onclick="setPage(${
            page === 1
              ? 3
              : page === totalPages && totalPages !== 2
              ? page
              : page + 1
          })">${
            page === 1 ? 3 : page === totalPages ? page : page + 1
          }</button></li>`
        : ""
    }
    <li class="page-item ${page === totalPages ? "disabled" : ""}">
    <button class="page-link" onclick="setPage(${page + 1})">></button>
    </li>
    <li class="page-item ${page === totalPages ? "disabled" : ""}">
    <button class="page-link" onclick="setPage(${totalPages})">>></button>
    </li>
  </ul>
</nav>
`;
