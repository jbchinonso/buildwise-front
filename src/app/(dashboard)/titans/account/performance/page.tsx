import PerformanceForm from './PerformanceForm';

const Performance = () => {
  return (
    <section className="flex flex-1 flex-col gap-4">
      <div className="flex flex-wrap gap-4 gap-x-20 w-full p-2">
        <PerformanceForm />
      </div>
    </section>
  );
}

export default Performance