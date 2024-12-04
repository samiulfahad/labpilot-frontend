import { Checkbox } from "@material-tailwind/react"

const TestList = ({ list, onChange }) => {
  return (
    <>
      <h2 className="w-full text-left text-md">ল্যাব টেস্টঃ</h2>
      <div className="flex flex-wrap justify-start items-center">
        {list.map((test) => (
          <Checkbox key={test._id} label={`${test.name} [${test.price} tk]`} value={test.name} onChange={() => onChange(test)} />
        ))}
      </div>
    </>
  )
}

export default TestList
