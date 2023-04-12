import React from "react";

const NavAdmin = () => {
  return (
    <nav>
      <ul className=" flex-column gap-3 nav">
        {/* <li className="nav-item">
          <a id="link_dash" href="/admin/home">
            แดชบอร์ด
          </a>
        </li> */}
        <li className="nav-item li_nave">
          <a id="link_dash" href="/admin/manage-user">
            จัดการสมาชิก
          </a>
        </li>
        <li className="nav-item li_nave">
          <a id="link_dash" href="/admin/create-product">
            เพื่มสินค้า
          </a>
        </li>
        <li className="nav-item li_nave">
          <a id="link_dash" href="/admin/manage-product">
            จัดการสินค้า
          </a>
        </li>
        <li className="nav-item li_nave">
          <a id="link_dash" href="/admin/create-category">
            เพื่มหมวดหมู่
          </a>
        </li>
        <li className="nav-item li_nave">
          <a id="link_dash" href="/admin/order">
            จัดการออเดอร์
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavAdmin;
