import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

const Testt = () => {
  const apiUrl = `http://www.career.go.kr/inspct/openapi/test/questions?apikey=0ae61054823ff25204fc658195732555&q=6`;
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [page, setPage] = useState(0);

  const fetchQuestions = useCallback(async () => {
    const response = await axios.get(apiUrl);
    setQuestions(response.data.RESULT);
    setAnswers(() => {
      return new Array(response.data.RESULT.length);
    });
  }, [apiUrl]);

  const visibleQuestions = useMemo(() => {
    return questions.slice(page * 5, (page + 1) * 5);
  }, [page, questions]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <div>
      {page} <br />
      <div>
        {visibleQuestions.map((question) => {
          const qitemNo = parseInt(question.qitemNo, 10);

          return (
            <div key={qitemNo}>
              <h3>{question.question}</h3>
              <div>
                <label>
                  <input
                    type="radio"
                    name={`answers[${qitemNo - 1}]`}
                    onChange={() => {
                      setAnswers((current) => {
                        const newAnswers = [...current];
                        newAnswers[qitemNo - 1] = question.answerScore01;
                        return newAnswers;
                      });
                    }}
                  />
                  {question.answer01}
                </label>

                <label>
                  <input
                    type="radio"
                    name={`answers[${qitemNo - 1}]`}
                    onChange={() => {
                      setAnswers((current) => {
                        const newAnswers = [...current];
                        newAnswers[qitemNo - 1] = question.answerScore02;
                        return newAnswers;
                      });
                    }}
                  />
                  {question.answer02}
                </label>
              </div>
            </div>
          );
        })}
      </div>
      {JSON.stringify(answers)}
      <br />
      <button
        onClick={() => {
          setPage((current) => {
            return current - 1;
          });
        }}
      >
        이전 페이지
      </button>
      <button
        onClick={() => {
          setPage((current) => {
            return current + 1;
          });
        }}
      >
        다음 페이지
      </button>
    </div>
  );
};

export default Testt;
