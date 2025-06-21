import { motion } from "framer-motion";

export default function TextInput({ value = "", onChange, placeholder = "", required = false, loading = false }) {
  return (
    <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        rows={6}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={loading}
      />
    </motion.div>
  );
}
