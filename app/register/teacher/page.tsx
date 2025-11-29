"use client";

import React, { useState } from "react";
import { addTeacher } from "@/lib/firestoreService";

export default function RegisterTeacherPage() {
  const [teacherName, setTeacherName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teacherName.trim()) {
      setStatusMessage("Nome inválido.");
      return;
    }

    setSubmitting(true);
    try {
      await addTeacher(teacherName.trim());
      setStatusMessage(`Professor '${teacherName}' cadastrado com sucesso!`);
      setTeacherName("");
    } catch (err) {
      console.error(err);
      setStatusMessage("Erro ao cadastrar professor.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Cadastro de Professor
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="teacher-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nome Completo do Professor
          </label>
          <input
            type="text"
            id="teacher-name"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="Ex: João Pereira"
          />
        </div>

        <button
          disabled={submitting}
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          {submitting ? "Cadastrando..." : "Cadastrar Professor"}
        </button>

        {statusMessage && (
          <p className="text-sm mt-3 text-center">{statusMessage}</p>
        )}
      </form>
    </div>
  );
}