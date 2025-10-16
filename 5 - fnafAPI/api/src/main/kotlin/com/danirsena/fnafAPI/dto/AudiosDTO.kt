package com.danirsena.fnafAPI.dto

import com.danirsena.fnafAPI.entities.Audio
import org.springframework.context.annotation.Description

data class AudiosDTO (
    val id: Long,
    val url: String?,
    val name: String?,
    val description: String?
)