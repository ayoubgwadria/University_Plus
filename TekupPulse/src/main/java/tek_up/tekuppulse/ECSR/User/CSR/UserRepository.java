package tek_up.tekuppulse.ECSR.User.CSR;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tek_up.tekuppulse.ECSR.User.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail (String email);
    boolean existsByEmail(String email);


}
