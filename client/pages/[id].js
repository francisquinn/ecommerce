import axios from "axios";

export const getStaticPaths = async () => {
  const res = await axios.get("http://localhost:8080/items");
  const data = await res.data;

  const paths = data.map((item) => {
    return {
      params: { id: item.id },
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
    "http://localhost:8080/items/item/" + id
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
        action="http://localhost:8080/items/checkout"
        method="POST"
      >
        <h1>{item.name}</h1>
        <span>€{item.price}</span>
        <br />

        <input type="hidden" name="item" value={item.name} />
        <input type="hidden" name="price" value={item.price_id} />
        <input type="text" name="quantity" value="3" />

        <button type="submit">Checkout</button>
      </form>
    </div>
  );
};

export default Details;
