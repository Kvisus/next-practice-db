import { GetServerSideProps } from "next";
import { dbInteraction } from "../pages/api/prisma";
import { MyType } from "../(utils)/prismaFlex";

async function DbQ() {
  const my = await dbInteraction();
  // console.log(my);

  if (my)
    return (
      <div>
        <h1 className="flex justify-center">Database Content</h1>
        <main className="grid grid-cols-3 gap-2 mx-2">
          {my.map((item) => (
            <div key={item.id} className="border-white border-2 ">
              <h1>Name:{item.name}</h1>
              <div>Role:{item.role}</div>
              <p>{item.age}</p>
              <p>{item.email}</p>
              {item.Post_Post_authorIdToUser ? (
                <p>{item.Post_Post_authorIdToUser.authorId}</p>
              ) : (
                "no"
              )}
            </div>
          ))}
        </main>
      </div>
    );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const posts = await dbInteraction();
//   return { props: { posts } };
// };

export default DbQ;

const getServerSideProps = async () => {
  const mu = await dbInteraction();
  return { props: { mu } };
};
