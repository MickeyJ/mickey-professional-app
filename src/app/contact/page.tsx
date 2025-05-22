export default function ContactPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">Contact</h1>
      <p className="text-center">This is the contact page.</p>
      <input
        type="text"
        placeholder="Name"
      />
      <input
        type="text"
        placeholder="Email"
      />
      <input
        type="textarea"
        placeholder="Message"
      />
    </div>
  );
}
