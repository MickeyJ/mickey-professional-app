export default function ContactPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">Contact</h1>
      <p className="text-center">This is the contact page.</p>
      <div className="flex flex-col items-center mt-4">
        <input
          type="text"
          placeholder="Name"
          className="mb-4 p-1 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Email"
          className="mb-4 p-1 border border-gray-300 rounded"
        />
        <input
          type="textarea"
          placeholder="Message"
          className="mb-4 p-1 border border-gray-300 rounded"
        />
      </div>
    </div>
  );
}
