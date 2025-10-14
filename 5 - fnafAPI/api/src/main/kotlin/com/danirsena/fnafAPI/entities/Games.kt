package com.danirsena.fnafAPI.entities

import com.fasterxml.jackson.annotation.JsonBackReference
import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.OneToMany
import jakarta.persistence.Table
import lombok.AllArgsConstructor
import lombok.Getter
import lombok.NoArgsConstructor
import lombok.Setter
import java.util.Date

@Entity
@Table(name = "games")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
class Games {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    var id: Long? = null

    @Column(name = "name", nullable = false)
    var name: String? = null

    @Column(name = "description")
    var description: String? = null

    @Column(name = "photo_url")
    var photoUrl: String? = null

    @Column(name = "date_of_release")
    var dateOfRelease: Date? = null

    @Column(name = "creator")
    var creator: String? = null

    @OneToMany(mappedBy = "game", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonBackReference
    val animatronics: List<Animatronic> = mutableListOf()
}