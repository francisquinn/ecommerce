import axios from "axios";

export const getStaticPaths = async () => {
  const res = await axios.get("https://ecom-test-server.herokuapp.com/items");
  const data = await res.data;

  const paths = data.map((item) => {
    return {
      params: { id: item._id },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await axios.get(
    "https://ecom-test-server.herokuapp.com/items/" + id
  );
  const data = await res.data;

  return {
    props: { item: data },
  };
};

const Details = ({ item }) => {
  return (
    <div>
      <h1>{item.text}</h1>
      <span>€{item.price}</span>
      <br />
      <button>Checkout</button>
    </div>
  );
};

export default Details;
