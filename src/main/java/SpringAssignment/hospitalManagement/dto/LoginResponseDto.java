package SpringAssignment.hospitalManagement.dto;


import SpringAssignment.hospitalManagement.entity.type.RoleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;



@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDto {
    String jwt;
    Long userId;
    Set<RoleType> roles;
}
