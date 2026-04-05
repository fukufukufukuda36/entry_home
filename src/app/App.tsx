import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

// 質問と回答のペア
const questions = [
  { question: "大谷の私たちのお家の名前", answer: "OYAOYA" },
  {
    question: "新高円寺の私たちのお家の名前",
    answer: "バウハウス高円寺",
  },
  {
    question: "桜新町の私たちのお家の名前",
    answer: "安平植物苑",
  },
  {
    question: "三鷹の私たちの団地の名前",
    answer: "三鷹台団地",
  },
];

// Substackのリンク（実際のURLに変更してください）
const SUBSTACK_URL = "https://fukufukufukuda.substack.com/";

export default function App() {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // いずれかの質問の正解と一致するかチェック（大文字小文字を区別しない）
    const isCorrect = questions.some(
      (q) =>
        q.answer.toLowerCase() === answer.trim().toLowerCase(),
    );

    if (isCorrect) {
      // 正解の場合、直接Substackに飛ばす
      window.location.href = SUBSTACK_URL;
    } else {
      setIsError(true);
      // エラー表示を2秒後にリセット
      setTimeout(() => setIsError(false), 2000);
    }
  };

  return (
    <div
      className="size-full flex items-center justify-center overflow-hidden relative"
      style={{ backgroundColor: "#c7f703" }}
    >
      <motion.div
        key="locked"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="p-8">
          {/* ヘッダー */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{
                rotate: isError ? [0, -10, 10, -10, 10, 0] : 0,
              }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <div className="text-4xl">🏠</div>
            </motion.div>
            <h1 className="text-3xl text-slate-900 mb-2">
              fukufukufukuda
            </h1>
            <p className="text-slate-700 text-sm">
              ふくだの交換日記メルマガに登録してくれる？
            </p>
          </motion.div>

          {/* 質セレクター */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <label className="block text-sm font-medium text-slate-800 mb-3">
              アクセスパスワード
            </label>
             <p className="text-slate-700 text-xs text-center mt-6">
            どれかひとつに答えてね</p>
            <div className="grid grid-cols-1 gap-3">
              {questions.map((q, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setSelectedQuestion(index);
                    setAnswer("");
                    setIsError(false);
                  }}
                  className={`p-4 rounded-lg transition-all duration-200 text-sm leading-relaxed ${
                    selectedQuestion === index
                      ? "bg-slate-900 text-white shadow-lg"
                      : "bg-white/70 text-slate-800 hover:bg-white"
                  }`}
                >
                  {q.question}
                </button>
              ))}
            </div>
          </motion.div>

          {/* フォーム */}
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
          >
            <div className="mb-6">
              <input
                type="text"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  setIsError(false);
                }}
                placeholder="私たちのおうちの名前"
                className={`w-full px-4 py-3 bg-white/70 border ${
                  isError
                    ? "border-red-500"
                    : "border-slate-300"
                } rounded-lg text-slate-900 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all`}
                autoComplete="off"
              />
              <AnimatePresence>
                {isError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-600 text-sm mt-2"
                  >
                    なんか違うっぽい
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <button
              type="submit"
              className="w-48 h-48 mx-auto relative transition-all duration-200 flex flex-col items-center justify-center gap-2 group rounded-full"
              style={{
                background:
                  "linear-gradient(45deg, #ff0000 0%, #ff7f00 7%, #ffff00 14%, #00ff00 21%, #0000ff 28%, #4b0082 35%, #9400d3 42%, #ff0000 49%, #ff7f00 56%, #ffff00 63%, #00ff00 70%, #0000ff 77%, #4b0082 84%, #9400d3 91%, #ff0000 100%)",
                color: "white",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
            >
              <span className="text-white text-sm text-center leading-tight">
                Substackの
                <br />
                ページに入るよ
              </span>
              <span className="text-6xl">🐘</span>
            </button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
