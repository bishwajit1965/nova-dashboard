import clsx from "clsx";
import { forwardRef } from "react";

const Textarea = forwardRef(
  (
    {
      name,
      label,
      placeholder = "",
      value,
      onChange,
      rows = 4,
      className,
      disabled = false,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className="form-control w-full">
        {label && (
          <label htmlFor={name} className="label">
            <span className="label-text">{label}</span>
          </label>
        )}

        <textarea
          id={name}
          name={name}
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          className={clsx(
            "textarea textarea-bordered w-full",
            error && "textarea-error",
            className
          )}
          {...props}
        />

        {error && (
          <label className="label">
            <span className="label-text-alt text-error">{error}</span>
          </label>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
