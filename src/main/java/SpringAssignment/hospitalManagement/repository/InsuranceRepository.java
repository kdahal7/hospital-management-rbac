package SpringAssignment.hospitalManagement.repository;

import SpringAssignment.hospitalManagement.entity.Insurance;
import org.springframework.data.jpa.repository.JpaRepository;


public interface InsuranceRepository extends JpaRepository<Insurance, Long> {
}