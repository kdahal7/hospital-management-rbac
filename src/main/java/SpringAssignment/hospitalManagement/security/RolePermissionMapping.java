package SpringAssignment.hospitalManagement.security;

import SpringAssignment.hospitalManagement.entity.type.PermissionType;
import SpringAssignment.hospitalManagement.entity.type.RoleType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;


import static SpringAssignment.hospitalManagement.entity.type.PermissionType.*;
import static SpringAssignment.hospitalManagement.entity.type.RoleType.*;


import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class RolePermissionMapping {

    private static final Map<RoleType, Set<PermissionType>> map = Map.of(
            PATIENT, Set.of(PATIENT_READ, APPOINTMENT_READ, APPOINTMENT_WRITE),
            DOCTOR, Set.of(APPOINTMENT_DELETE, APPOINTMENT_WRITE, APPOINTMENT_READ, PATIENT_READ),
            ADMIN, Set.of(PATIENT_READ, PATIENT_WRITE, APPOINTMENT_READ, APPOINTMENT_WRITE, APPOINTMENT_DELETE, USER_MANAGE, REPORT_VIEW),
            USER, Set.of(PATIENT_READ, APPOINTMENT_READ)
    );

    public static Set<SimpleGrantedAuthority> getAuthoritiesForRole(RoleType role) {
        return map.get(role).stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());
    }
}
