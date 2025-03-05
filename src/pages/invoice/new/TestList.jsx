

const TestList = ({ list, onChange }) => {
  return (
    <>
      <h2 className="w-full text-left text-md">Test List</h2>
      <div className="flex flex-wrap justify-start items-center">
        {list.map((test) => (
          <div key={test._id}>
            <label className="cursor-pointer flex items-center">
              <input type="checkbox" value={test.name} onChange={() => onChange(test)} className="w-[20px] h-[20px]" />{" "}
              <span className="px-2">{test.name} [{test.price}tk]</span>
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default TestList;
