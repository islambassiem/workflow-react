import { useSetupContext } from "@/Context/SetupProvider";


export default function Users() {
  const {t} = useSetupContext();
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('Users')}</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mt-6">
        <div className="py-3">
          <section className="text-gray-600 dark:text-gray-400">
            
          </section>
        </div>
      </div>
    </>
  );
}