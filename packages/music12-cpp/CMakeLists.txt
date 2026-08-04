cmake_minimum_required(VERSION 3.16)
project(music12-cpp VERSION 1.0.0 LANGUAGES CXX)

# C++20
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# 位置无关代码(便于嵌入其他项目)
set(CMAKE_POSITION_INDEPENDENT_CODE ON)

# nlohmann/json(header-only,从 third_party 读)
# 如果系统装了 nlohmann_json 就用系统的,否则用 third_party 的单头文件
find_package(nlohmann_json 3.2.0 QUIET)
if(NOT nlohmann_json_FOUND)
    # 用 third_party 的单头文件
    include_directories(SYSTEM third_party)
    message(STATUS "nlohmann/json: 使用 third_party 单头文件")
else()
    message(STATUS "nlohmann/json: 使用系统安装")
endif()

# ==================== music12 静态库 ====================
file(GLOB_RECURSE M12_SOURCES CONFIGURE_DEPENDS src/*.cpp)
add_library(music12 STATIC ${M12_SOURCES})
# include/ 是公共头(用户用 music12/Note.hpp)
# include/music12/ 是内部头(src 文件直接 #include "Note.hpp")
target_include_directories(music12 PUBLIC
    include
    ${CMAKE_CURRENT_SOURCE_DIR}/include/music12
)

if(nlohmann_json_FOUND)
    target_link_libraries(music12 PUBLIC nlohmann_json::nlohmann_json)
endif()

# ==================== 测试(GoogleTest)====================
option(MUSIC12_BUILD_TESTS "Build music12 tests" ON)
if(MUSIC12_BUILD_TESTS)
    include(FetchContent)
    FetchContent_Declare(
        googletest
        GIT_REPOSITORY https://github.com/google/googletest.git
        GIT_TAG v1.14.0
    )
    # Windows 防止覆盖父项目的编译器设置
    set(gtest_force_shared_rt ON CACHE BOOL "" FORCE)
    FetchContent_MakeAvailable(googletest)

    enable_testing()
    file(GLOB M12_TEST_SOURCES CONFIGURE_DEPENDS test/test_*.cpp)
    add_executable(music12_tests ${M12_TEST_SOURCES})
    target_link_libraries(music12_tests PRIVATE music12 GTest::gtest_main)
    include(GoogleTest)
    gtest_discover_tests(music12_tests)

    # 密等验证器(独立可执行,不链接 GoogleTest)
    add_executable(verify_equivalence test/verify_equivalence.cpp)
    target_link_libraries(verify_equivalence PRIVATE music12)
endif()
