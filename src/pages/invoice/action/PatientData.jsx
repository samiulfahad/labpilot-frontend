/** @format */

const PatientData = ({ invoice, onChange, onSave, disabled, onEdit }) => {

  const disabledClass = "px-4 py-1 w-60 text-left bg-white rounded-md"
  const editClass = "px-4 py-1 w-60 text-left bg-gray-100 rounded-md"

  return (
    <div>
      <div className="flex justify-between items-center text-center w-full">
        <p className="font-bold text-lg text-left w-28 py-4">Patient Info</p>
        {disabled && (
          <button onClick={onEdit} className="mr-20 px-4 bgColor text-center flex-shrink-0 w-16 h-8 text-white">
            Edit
          </button>
        )}
      </div>
      <div className="flex flex-col justify-start items-center space-y-2 ">
        <div className="flex space-x-4 justify-start items-center">
          <p className="w-28 text-left">Name</p>
          <input
            name="name"
            value={invoice?.name || ""}
            onChange={onChange}
            disabled={disabled}
            className={ disabled ? disabledClass : editClass}
          />
        </div>
        <div className="flex space-x-4 justify-start items-center">
          <p className="w-28 text-left ">Age</p>
          <input
            name="age"
            value={invoice?.age || ""}
            onChange={onChange}
            disabled={disabled}
            className={ disabled ? disabledClass : editClass}
          />
        </div>
        <div className="flex space-x-4 justify-start items-center">
          <p className="w-28 text-left">Contact</p>
          <input
            name="contact"
            value={invoice?.contact || ""}
            onChange={onChange}
            disabled={disabled}
            className={ disabled ? disabledClass : editClass}
          />
        </div>
        <div className="flex space-x-4 justify-start items-center">
          <p className="w-28 text-left">Doctor's Name</p>
          <input
            name="doctorName"
            value={invoice?.doctorName || ""}
            onChange={onChange}
            disabled={disabled}
            className={ disabled ? disabledClass : editClass}
          />
        </div>
        <div className="flex space-x-2 justify-start items-center">
          <p className="w-72 text-left">Gender</p>
          <select name="gender" value={invoice?.gender || ""} disabled={disabled} onChange={onChange} className="bg-gray-200 rounded-md w-full mx-auto">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {!disabled && (
          <div className="flex justify-end items-center space-x-4 w-4/5">
            <button onClick={onSave} className="px-2 py-1 bgColor text-white rounded">
              Save
            </button>
            <button onClick={onEdit} className="px-2 py-1 bg-red-400 text-white rounded">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientData;
