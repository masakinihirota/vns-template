export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "20px" }}>
      <h2>Layout Header</h2>
      {children}
      <h2>Layout Footer</h2>
    </div>
  );
}
