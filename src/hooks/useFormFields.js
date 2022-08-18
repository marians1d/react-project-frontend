import { useState, useCallback } from 'react';

export const useFormFields = (initialState) => {
  const [fields, setValues] = useState(initialState);
  const [hasErrors, setHasErrors] = useState(true);

  const fieldChange = useCallback((event) => {

    setValues({
      ...fields,
      [event.target.id]: { ...fields[event.target.id], value: event.target.value },
    });
  }, [fields]);

  const errorHandler = useCallback((event, error) => {
    const newFields = {
      ...fields,
      [event.target.id]: { value: event.target.value, error },
    };

    setValues(newFields);

    setHasErrors(Object.values(newFields).filter(f => f.error).length > 0);
  }, [fields]);

  return {
    fields,
    fieldChange,
    errorHandler,
    hasErrors,
  };
};