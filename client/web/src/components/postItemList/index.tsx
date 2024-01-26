import './postItemList.css'

interface ItemListProps {
  inputString: string;
}


const PostItemList: React.FC<ItemListProps> = ({ inputString }) => {
  const items = inputString.split("-").filter((item) => item.trim() !== "");

  return (
      <ul className="post-item-list">
          {items.map((item, index) => (
              <li key={index}>{`${item.trim()}`}</li>
          ))}
      </ul>
  );
};

export default PostItemList