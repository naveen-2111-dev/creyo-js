import { useState, useEffect } from "react";
import Navbar from "@/components/NavBar";
import "tailwindcss/tailwind.css";

const generateRoomId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export default function Messages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [people, setPeople] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState({});
  const [currentUser, setCurrentUser] = useState("You");
  const [users, setUsers] = useState([]); // State to hold the users from the database

  // Fetch users from API when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/retriveUser");
      const data = await res.json();
      setUsers(data.users); // Set the users state
    };
    fetchUsers();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const handlePeopleChange = (e) => {
    setPeople(e.target.value);
  };

  const handleCreateRoom = () => {
    if (roomName && people) {
      const roomId = generateRoomId();
      const newRoom = {
        id: roomId,
        name: roomName,
        people: people.split(",").map((person) => person.trim()),
      };
      setRooms([...rooms, newRoom]);
      setRoomName("");
      setPeople("");
      setIsModalOpen(false);
    } else {
      alert("Please enter both a room name and people.");
    }
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setCurrentUser(room.people[0] === "You" ? room.people[1] : room.people[0]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageInput = e.target.elements.message;
    const message = messageInput.value.trim();
    if (message && selectedRoom) {
      const updatedMessages = { ...messages };
      if (!updatedMessages[selectedRoom.id]) {
        updatedMessages[selectedRoom.id] = [];
      }
      updatedMessages[selectedRoom.id].push({
        sender: currentUser,
        message,
        timestamp: new Date().toLocaleTimeString(),
      });
      setMessages(updatedMessages);
      messageInput.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <Navbar />
      <div className="pt-20 flex items-start justify-center p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
          <div className="col-span-3 bg-white h-96 p-5 border border-black rounded-lg shadow-md md:w-full sm:w-full overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Messages</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-600 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
                onClick={toggleModal}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v14M5 12h14"
                />
              </svg>
            </div>
            <div className="space-y-4">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRoomClick(room)}
                >
                  <h3 className="font-semibold">{room.name}</h3>
                  <p className="text-sm text-gray-500">{room.people.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-9 bg-white p-8 rounded-lg h-[750px] border border-black shadow-md flex flex-col">
            {selectedRoom ? (
              <>
                <h2 className="text-2xl font-semibold mb-10">
                  {selectedRoom.name} - Conversation
                </h2>
                <div className="space-y-4 flex-1 overflow-y-auto">
                  {messages[selectedRoom.id]?.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === currentUser ? "justify-end" : "justify-start"}`}
                    >
                      {msg.sender !== currentUser && (
                        <div className="w-12 h-12 bg-gray-400 rounded-full mr-8"></div>
                      )}
                      <div>
                        <p
                          className={`p-3 rounded-lg mr-10 ${
                            msg.sender === currentUser ? "bg-blue-100" : "bg-gray-100"
                          } text-gray-800`}
                        >
                          {msg.message}
                        </p>
                        <span className="text-sm text-gray-400">{msg.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="mt-6 flex items-center space-x-4">
                  <input
                    name="message"
                    type="text"
                    placeholder="Type a message..."
                    className="w-full p-3 border rounded-lg text-black"
                  />
                  <button className="bg-black text-white p-3 rounded-lg" type="submit">
                    Send
                  </button>
                </form>
              </>
            ) : (
              <p className="text-center text-gray-500">Whoops! No Room to Join.</p>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-black absolute top-2 right-2 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              onClick={toggleModal}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>

            <h3 className="text-xl font-semibold mb-4">Create a New Room</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" htmlFor="roomName">
                Room Name
              </label>
              <input
                id="roomName"
                type="text"
                value={roomName}
                onChange={handleRoomNameChange}
                placeholder="Enter room name"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" htmlFor="people">
                Add People
              </label>
              <input
                id="people"
                type="text"
                value={people}
                onChange={handlePeopleChange}
                placeholder="Enter people names"
                className="w-full p-3 border rounded-lg"
              />
              {users.length > 0 && (
                <ul className="mt-2 bg-white border rounded-lg max-h-48 overflow-y-auto">
                  {users.map((user) => (
                    <li
                      key={user.email}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        setPeople(user.firstname); // Select person and set in input
                      }}
                    >
                      {user.firstname}
                    </li>
                  ))}
                </ul>
              )}
              
            </div>

            <div className="flex justify-end">
              <button
                className="bg-black text-white px-6 py-2 rounded-lg"
                onClick={handleCreateRoom}
              >
                Create Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
