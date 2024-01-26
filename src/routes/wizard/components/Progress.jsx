import flow from "../domain/flow";

export default function Progress({ data, url }) {
  const steps = flow(data);
  const currentStep = steps.findIndex((path) => path === url);
  const previousStep = steps.findIndex((path) => path === data?.pathname);

  return (
    currentStep > 0 && (
      <div
        class="progressbar"
        style={`--currentValue: ${currentStep}; --previousValue: ${previousStep}; --maxValue: ${
          steps.length - 2
        }`}
      />
    )
  );
}
