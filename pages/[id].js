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
      <form
        action="https://ecom-test-server.herokuapp.com/checkout"
        method="POST"
      >
        <h1 name="itemText">{item.text}</h1>
        <span name="itemPrice">€{item.price}</span>
        <br />

        <button type="submit">Checkout</button>
      </form>
    </div>
  );
};

export default Details;
