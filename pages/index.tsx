import {
  AnswerPollDocument,
  GetPollDocument,
} from "@/components/documents.generated";
import { Poll } from "@/components/poll";
import { useMutation, useQuery } from "@apollo/client";
import clsx from "clsx";
import { Space_Grotesk } from "next/font/google";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function Home() {
  // ignoring error for now, as this is a demo

  const { data } = useQuery(GetPollDocument, {
    variables: {
      id: "1",
    },
  });

  const [vote, { loading }] = useMutation(AnswerPollDocument);

  const handleVote = async (answerId: string) => {
    await vote({
      variables: {
        pollId: "1",
        answerId,
      },
    });
  };

  return (
    <div
      className={clsx(
        "bg-blue-600 text-white min-h-screen",
        spaceGrotesk.className
      )}
    >
      <main className="max-w-5xl p-8">
        <header className="mb-4">
          <h1 className="text-3xl underline underline-offset-2">
            Apollo Next.js 13 Poll Demo
          </h1>
        </header>

        {data?.poll ? (
          <Poll onClick={handleVote} poll={data.poll} loading={loading} />
        ) : (
          <div>loading</div>
        )}
      </main>
    </div>
  );
}
