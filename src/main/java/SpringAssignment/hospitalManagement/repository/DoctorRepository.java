package SpringAssignment.hospitalManagement.repository;


import SpringAssignment.hospitalManagement.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}