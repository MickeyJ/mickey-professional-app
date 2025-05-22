export default function ContactPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">Contact</h1>
      <p className="text-center">This is the contact page.</p>
      <div className="w-full flex flex-row items-center justify-center mt-4">
        <div className="max-w-md p-4 border border-gray-300 rounded">
          <h2 className="text-xl font-bold mb-4">Send Me An Email</h2>
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
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}
