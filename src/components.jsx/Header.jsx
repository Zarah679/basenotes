import { RiMoonFill } from "@remixicon/react"

const Header = ({ onAddClick }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-zinc-900">BaseNotes</h1>

      <button
        onClick={onAddClick}
        className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700"
      >
        + Add Note
      </button>
    </div>
  );
};

export default Header;
