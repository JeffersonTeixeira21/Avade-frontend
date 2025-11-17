export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="
        absolute left-2 top-2
        p-2 bg-yellow-300 text-black font-semibold
        rounded shadow-md
        translate-y-[-200%]
        focus:translate-y-0
        transition-transform
      "
    >
      Ir para o conteúdo
    </a>
  );
}
