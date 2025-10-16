package com.danirsena.fnafAPI.dto

import org.springframework.context.annotation.Description

data class CREATEphotoDTO(
    var url: String,
    val animatronicId: Long,
    val name: String?,
    val description: String?
);