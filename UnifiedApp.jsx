import { useState } from "react";
import { motion } from "framer-motion";

function Axis({ question, onReflect }) {
  const reflect = (q) => {
    const lq = q.toLowerCase();
    if (!q.trim()) return "Ask something real.";
    if (lq.includes("should")) return "Are you asking for permission or clarity?";
    if (lq.includes("why can't I")) return "What rule are you obeying that doesn’t exist anymore?";
    if (lq.includes("what do I do")) return "What would the version of you who’s clear already be doing?";
    return `What’s the real question hiding inside: “${q}”?`;
  };
  return (
    <div className="space-y-2 text-center">
      <input
        className="w-full px-4 py-2 border border-cyan-400 rounded bg-zinc-800 text-white text-center"
        placeholder="What’s unclear?"
        onChange={(e) => onReflect(reflect(e.target.value))}
      />
    </div>
  );
}

function SelfEdit({ onEdit }) {
  const [edit, setEdit] = useState("");
  const apply = () => {
    if (!edit.trim()) return;
    onEdit(edit);
    setEdit("");
  };
  return (
    <div className="space-y-2 text-center">
      <input
        value={edit}
        onChange={(e) => setEdit(e.target.value)}
        className="w-full px-4 py-2 border border-green-500 bg-zinc-900 text-white text-center rounded"
        placeholder="I now release… / I now activate…"
      />
      <button onClick={apply} className="bg-green-600 hover:bg-green-500 px-4 py-1 rounded-full text-white font-semibold">
        Apply Edit
      </button>
    </div>
  );
}

function Vault({ balance }) {
  return (
    <div className="text-center mt-4">
      <p className="text-xl text-green-300">Vault Balance</p>
      <p className="text-2xl font-bold">${balance.toLocaleString()}</p>
      <p className="text-sm text-zinc-400">Clarity is currency.</p>
    </div>
  );
}

export default function UnifiedApp() {
  const [question, setQuestion] = useState("");
  const [reflection, setReflection] = useState("");
  const [edits, setEdits] = useState([]);
  const [balance, setBalance] = useState(1000000);

  const handleReflect = (r) => setReflection(r);
  const handleEdit = (edit) => {
    setEdits([...edits, edit]);
    setBalance(balance + 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-8">
      <h1 className="text-4xl font-bold text-cyan-300 text-center">Unified OS</h1>
      <Axis question={question} onReflect={handleReflect} />
      {reflection && <p className="text-green-400 text-center">{reflection}</p>}
      <SelfEdit onEdit={handleEdit} />
      <Vault balance={balance} />
      {edits.length > 0 && (
        <div className="mt-4 text-sm max-w-lg mx-auto text-green-300">
          <p className="mb-2">🔐 Edits Applied:</p>
          <ul className="space-y-1">{edits.map((e, i) => <li key={i}>→ {e}</li>)}</ul>
        </div>
      )}
    </div>
  );
}
