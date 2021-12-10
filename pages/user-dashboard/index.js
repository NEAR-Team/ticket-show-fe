export default function UserDashboard() {
  return (
    <div className="bg-white py-5">
      <div className="container mx-auto space-y-5 p-5">
        <h1 className="uppercase text-gray-800 font-medium">User Dashboard</h1>
        <div className="h-screen">
          <div className="flex flex-row space-x-5">
            <div className="flex flex-col px-2 space-y-3">
              <button className="px-3 py-2 rounded border-2 hover:bg-blue-500 hover:text-white hover:border-0">
                My Company
              </button>
              <button className="px-3 py-2 rounded border-2 hover:bg-blue-500 hover:text-white hover:border-0">
                My Show
              </button>
              <button className="px-3 py-2 rounded border-2 hover:bg-blue-500 hover:text-white hover:border-0">
                My Ticket
              </button>
            </div>
            <div>asdasb</div>
          </div>
        </div>
      </div>
    </div>
  );
}
