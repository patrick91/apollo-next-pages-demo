import {
  AnswerPollDocument,
  GetPollDocument,
} from "@/components/documents.generated";
import { Poll } from "@/components/poll";
import { initializeApollo, addApolloState } from "@/lib/client";
import { useMutation, useQuery } from "@apollo/client";
import clsx from "clsx";
import { GetStaticPropsContext } from "next";
import { Space_Grotesk } from "next/font/google";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export async function getStaticProps(context: GetStaticPropsContext) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GetPollDocument,
    variables: {
      id: context.params!.id,
    },
  });

  return addApolloState(apolloClient, {
    props: {
      id: context.params!.id,
    },
  });
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }],
    fallback: false,
  };
}

export default function PollPage({ id }: { id: string }) {
  // ignoring error for now, as this is a demo

  const { data } = useQuery(GetPollDocument, {
    variables: {
      id,
    },
    fetchPolicy: "cache-only",
  });

  const [vote, { loading }] = useMutation(AnswerPollDocument);

  const handleVote = async (answerId: string) => {
    await vote({
      variables: {
        pollId: id,
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
