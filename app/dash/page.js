
import { auth } from "@/auth";
import DashTable from "@/components/DashTable";
import styles from './page.module.css';

const DashPage = async() => {


  const session = await auth();


  const department = session?.user?.department;
  const level = session?.user?.level;
  const isAdmin = session?.user?.isAdmin;

  return (
    <div className={styles.dashboardContainer}>
      {/* <h1 className={styles.pageTitle}>Orders Dashboard</h1> */}
      <DashTable 
        department={department} 
        level={level} 
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default DashPage;
