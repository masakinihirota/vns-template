import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", border: "1px solid #ccc", padding: "20px" }}>
      <nav style={{ width: "200px", marginRight: "20px" }}>
        <h3>Menu</h3>
        <ul>
          <li>
            <Link href="/unauth/home" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/unauth/about" className="hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link href="/unauth/contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div style={{ flex: 1 }}>
        <h2>Layout Header</h2>
        {children}
        <h2>Layout Footer</h2>
      </div>
    </div>
  );
}
