const InputField = ({
  label = "",
  type = "",
  name = "",
  autocomplete = "",
  placeholder = "",
  onchange,
  value,
  disable,
  error,
}) => {
  return (
    <div>
      <div className="max-w-sm space-y-2">
        <label htmlFor={label} className="block text-base font-semibold">
          {label}
        </label>
        <input
          type={type}
          id={label}
          name={name}
          className={`w-full rounded-lg border-2 bg-input px-4 py-3 text-base font-medium text-black outline-1 outline-primary  ${
            error ? "border-error" : "border-border"
          }`}
          required=""
          aria-describedby={label}
          autoComplete={autocomplete}
          placeholder={placeholder}
          disabled={disable}
          onChange={onchange}
          value={value}
        />
      </div>
      {error && (
        <p className={`mt-1 text-base text-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
