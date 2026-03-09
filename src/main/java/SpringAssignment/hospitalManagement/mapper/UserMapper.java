package SpringAssignment.hospitalManagement.mapper;

import SpringAssignment.hospitalManagement.dto.UserInfoDto;
import SpringAssignment.hospitalManagement.entity.User;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface UserMapper {
    UserInfoDto toUserInfoDto(User user);
}
