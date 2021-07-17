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
  const res = await axios.get("http://localhost:8080/items/item/" + id);
  const data = await res.data;

  return {
    props: { item: data },
  };
};

const Details = ({ item }) => {
  return (
    <div>
        <h1>{item.name}</h1>
        <span>€{item.price}</span>
        <br />
        <button type="submit">Add to cart</button>
    </div>
  );
};

export default Details;
