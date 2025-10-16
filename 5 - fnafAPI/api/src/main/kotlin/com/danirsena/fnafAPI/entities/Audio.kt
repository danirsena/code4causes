package com.danirsena.fnafAPI.entities

import com.fasterxml.jackson.annotation.JsonBackReference
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import lombok.AllArgsConstructor
import lombok.Getter
import lombok.NoArgsConstructor
import lombok.Setter
import org.springframework.context.annotation.Description

@Entity
@Table(name = "audio")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
class Audio(

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    val id: Int,

    @Column
    var url: String?,

    @Column var name: String?,

    @Column var description: String?,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animatronic_id")
    @JsonBackReference
    val animatronic: Animatronic
)