// package com.bank.api;

// import org.glassfish.jersey.server.ResourceConfig;

// import jakarta.ws.rs.ApplicationPath;

// // @ApplicationPath("/")
// // public class RestApplication extends ResourceConfig {
// //     public RestApplication() {
// //         packages("com.bank.api");
// //         ObjectMapper mapper = new ObjectMapper();
// //         mapper.registerModule(new JavaTimeModule()); // Fixes LocalDateTime serialization
// //         JacksonJaxbJsonProvider provider = new JacksonJaxbJsonProvider();
// //         provider.setMapper(mapper);
// //         register(provider);
// //     }
// // }
// @ApplicationPath("/")
// public class RestApplication extends ResourceConfig {
//     public RestApplication() {
//         packages("com.bank.api");
//         register(org.glassfish.jersey.jackson.JacksonFeature.class);
//     }
// }


package com.bank.api;

import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;

import jakarta.ws.rs.ApplicationPath;

@ApplicationPath("/")
public class RestApplication extends ResourceConfig {
    public RestApplication() {
        packages("com.bank.api");
        register(JacksonFeature.class);
    }
}

