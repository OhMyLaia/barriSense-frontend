import { useState } from "react";
import { Link } from "react-router-dom";
import people from "../assets/people.svg";

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "Què és BarriSense?",
      answer:
        "BarriSense és una plataforma cívica perquè les veïnes i veïns de Barcelona puguin comunicar problemes o queixes del seu barri — des d’un fanal trencat fins a turistes constantment fent soroll.",
    },
    {
      question: "Qui pot enviar una queixa?",
      answer:
        "Qualsevol persona resident o visitant pot enviar una queixa. Només demanem la informació mínima: el barri i una breu descripció.",
    },
    {
      question: "Què passa després d’enviar-la?",
      answer:
        "Les queixes s’emmagatzemen i són visibles a la llista del barri corresponent. Els veïns o les autoritats poden revisar-les per prioritzar solucions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-10 max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            BarriSense
          </h1>
          <img className="w-1/3" src={people}></img>
          <p className="text-lg md:text-xl text-gray-600">
            Un espai perquè els veïns i veïnes de Barcelona comparteixin les
            coses que no funcionen al seu barri — d’una manera senzilla,
            respectuosa i transparent.
          </p>

          <div className="mt-6 flex gap-3">
            <Link
              to="/queixa"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow"
            >
              Envia una queixa
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        <section
          id="com-funciona"
          className="mb-12 bg-white p-6 rounded-lg shadow-sm"
        >
          <h2 className="text-2xl font-semibold mb-4">Com funciona</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              <strong>Tria el teu barri</strong> — selecciona el barri on hi ha
              el problema.
            </li>
            <li>
              <strong>Descriu el problema</strong> — una breu explicació ajuda a
              entendre i prioritzar.
            </li>
            <li>
              <strong>Envia la queixa</strong> — el teu missatge s’associa al
              barri i apareixerà a la seva llista de queixes.
            </li>
          </ol>
        </section>
      </main>
    </div>
  );
}
